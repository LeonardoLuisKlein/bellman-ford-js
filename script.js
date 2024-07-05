function BellmanFord(vertices, edges, source) {
  // Esta implementação recebe um grafo representado como uma
  // lista de vértices e arestas e modifica os vértices para
  // que que seus atributos distância e anterior armazenem
  // os caminhos mais curtos.
  // Passo 1: Inicializar o grafo
  vertices.forEach((v) => {
    if (v === source) {
      v.distance = 0;
    } else {
      v.distance = Infinity;
    }
    v.previous = null;
  });

  // Passo 2: Ajustar as arestas repetidamente
  for (let i = 0; i < vertices.length - 1; i++) {
    edges.forEach((edge) => {
      const u = edge.origin;
      const v = edge.destination;
      if (v.distance > u.distance + edge.weight) {
        v.distance = u.distance + edge.weight;
        v.previous = u;
      }
    });
  }

  // Passo 3: Verificar a existência de ciclos com peso negativo
  edges.forEach((edge) => {
    const u = edge.origin;
    const v = edge.destination;
    if (v.distance > u.distance + edge.weight) {
      throw new Error("O grafo contém um ciclo de peso negativo.");
    }
  });
}

const vertices = [
  { id: "A", distance: Infinity, previous: null },
  { id: "B", distance: Infinity, previous: null },
  { id: "C", distance: Infinity, previous: null },
  { id: "D", distance: Infinity, previous: null },
];

const edges = [
  { origin: vertices[0], destination: vertices[1], weight: 1 },
  { origin: vertices[0], destination: vertices[2], weight: 4 },
  { origin: vertices[1], destination: vertices[2], weight: 2 },
  { origin: vertices[1], destination: vertices[3], weight: 5 },
  { origin: vertices[2], destination: vertices[3], weight: 1 },
];

BellmanFord(vertices, edges, vertices[0]);

vertices.forEach((v) => {
  console.log(
    `Vértice ${v.id}: distância = ${v.distance}, anterior = ${
      v.previous ? v.previous.id : "null"
    }`
  );
});
