// ============================================================================
// Proyecto: TechNova – Sistema de Control de Inventario Tecnológico (Colombia)
// ============================================================================

// ----------------------------------------------------------------------------
// ETAPA 1: Selección / creación de la base de datos
// (En consola interactiva MONGOSH equivale a: use technova)
// ----------------------------------------------------------------------------
db = db.getSiblingDB("technova");

// ----------------------------------------------------------------------------
// ETAPA 2: Creación de las cuatro colecciones
// ----------------------------------------------------------------------------
db.createCollection("categorias");
db.createCollection("proveedores");
db.createCollection("productos");
db.createCollection("movimientos_inventario");

// ----------------------------------------------------------------------------
// ETAPA 3: Inserción masiva de categorías (8 documentos)
// ----------------------------------------------------------------------------
db.categorias.insertMany([
  {
    nombre: "Computadores",
    descripcion: "Portátiles y computadores de escritorio para uso personal, empresarial y gaming.",
    estado: "activa"
  },
  {
    nombre: "Procesadores",
    descripcion: "Unidades centrales de procesamiento (CPU) de alto rendimiento para equipos de escritorio.",
    estado: "activa"
  },
  {
    nombre: "Tarjetas gráficas",
    descripcion: "Tarjetas de video dedicadas (GPU) para diseño, edición y videojuegos.",
    estado: "activa"
  },
  {
    nombre: "Memorias y almacenamiento",
    descripcion: "Módulos de memoria RAM, unidades de estado sólido (SSD) y discos duros.",
    estado: "activa"
  },
  {
    nombre: "Periféricos",
    descripcion: "Teclados, mouse, audífonos y cámaras web para complementar el computador.",
    estado: "activa"
  },
  {
    nombre: "Monitores",
    descripcion: "Pantallas LED, IPS y gaming de diferentes tamaños y tasas de refresco.",
    estado: "activa"
  },
  {
    nombre: "Redes y conectividad",
    descripcion: "Routers, repetidores Wi-Fi, switches y adaptadores de red.",
    estado: "activa"
  },
  {
    nombre: "Accesorios tecnológicos",
    descripcion: "Cables, bases refrigerantes, hubs USB, adaptadores y soportes.",
    estado: "activa"
  }
]);

// ----------------------------------------------------------------------------
// ETAPA 4: Inserción masiva de proveedores en Colombia (10 documentos)
// ----------------------------------------------------------------------------
db.proveedores.insertMany([
  {
    nombre_empresa: "TecnoImportaciones Andinas S.A.S.",
    nit: "900123456-1",
    contacto: "Carlos Mendoza",
    telefono: "3105550101",
    correo: "ventas@tecnoandinas.co",
    direccion: "Calle 72 # 10-34",
    ciudad: "Bogotá",
    estado: "activo"
  },
  {
    nombre_empresa: "Distribuidora Digital del Valle Ltda.",
    nit: "900234567-2",
    contacto: "Laura Gómez",
    telefono: "3115550102",
    correo: "contacto@digitalvalle.co",
    direccion: "Avenida 6N # 24-50",
    ciudad: "Cali",
    estado: "activo"
  },
  {
    nombre_empresa: "Hardware Paisa S.A.S.",
    nit: "900345678-3",
    contacto: "Andrés Restrepo",
    telefono: "3125550103",
    correo: "pedidos@hardwarepaisa.co",
    direccion: "Carrera 43A # 14-20",
    ciudad: "Medellín",
    estado: "activo"
  },
  {
    nombre_empresa: "Caribe Tech Solutions S.A.S.",
    nit: "900456789-4",
    contacto: "Sofía Herrera",
    telefono: "3135550104",
    correo: "comercial@caribetech.co",
    direccion: "Calle 84 # 51-15",
    ciudad: "Barranquilla",
    estado: "activo"
  },
  {
    nombre_empresa: "Sistemas y Redes de Oriente S.A.S.",
    nit: "900567890-5",
    contacto: "Julián Paredes",
    telefono: "3145550105",
    correo: "info@redesdeoriente.co",
    direccion: "Carrera 33 # 48-12",
    ciudad: "Bucaramanga",
    estado: "activo"
  },
  {
    nombre_empresa: "CompuPartes del Eje S.A.S.",
    nit: "900678901-6",
    contacto: "Valentina Ríos",
    telefono: "3155550106",
    correo: "ventas@compuparteseje.co",
    direccion: "Avenida Circunvalar # 12-40",
    ciudad: "Pereira",
    estado: "activo"
  },
  {
    nombre_empresa: "MicroElectrónica Capital S.A.S.",
    nit: "900789012-7",
    contacto: "Mateo Vargas",
    telefono: "3165550107",
    correo: "compras@microcapital.co",
    direccion: "Carrera 15 # 78-22",
    ciudad: "Bogotá",
    estado: "activo"
  },
  {
    nombre_empresa: "InnovaPeriféricos Colombia S.A.S.",
    nit: "900890123-8",
    contacto: "Camila Duarte",
    telefono: "3175550108",
    correo: "soporte@innovaperifericos.co",
    direccion: "Calle 19 # 8-45",
    ciudad: "Cartagena",
    estado: "activo"
  },
  {
    nombre_empresa: "MegaComponentes del Sur S.A.S.",
    nit: "900901234-9",
    contacto: "Diego Castro",
    telefono: "3185550109",
    correo: "ventas@megacomponentes.co",
    direccion: "Carrera 23 # 62-18",
    ciudad: "Manizales",
    estado: "activo"
  },
  {
    nombre_empresa: "TecnoGlobal Mayorista S.A.S.",
    nit: "901012345-0",
    contacto: "Paula Ramírez",
    telefono: "3195550110",
    correo: "contacto@tecnoglobal.co",
    direccion: "Calle 10 # 4-30",
    ciudad: "Ibagué",
    estado: "inactivo"
  }
]);

// ----------------------------------------------------------------------------
// ETAPA 5: Carga de referencias ObjectId e inserción de 100 productos (COP)
// ----------------------------------------------------------------------------
const cats = {};
db.categorias.find().forEach(c => { cats[c.nombre] = c._id; });
const provs = db.proveedores.find({ estado: "activo" }).toArray().map(p => p._id);
print("Categorías cargadas:", Object.keys(cats).length, "| Proveedores activos:", provs.length);

const catalogoBase = [
  { nombre: "Portátil IdeaPad", marca: "Lenovo", cat: "Computadores", baseCompra: 1800000, desc: "Portátil para estudio y oficina" },
  { nombre: "Portátil Pavilion", marca: "HP", cat: "Computadores", baseCompra: 2100000, desc: "Portátil multipropósito de alto rendimiento" },
  { nombre: "Portátil ROG Strix", marca: "ASUS", cat: "Computadores", baseCompra: 4200000, desc: "Portátil gamer con tarjeta dedicada" },
  { nombre: "PC Escritorio OptiPlex", marca: "Dell", cat: "Computadores", baseCompra: 2300000, desc: "Computador de escritorio empresarial" },
  { nombre: "Portátil Aspire", marca: "Acer", cat: "Computadores", baseCompra: 1650000, desc: "Portátil liviano para uso diario" },
  { nombre: "Procesador Core i5", marca: "Intel", cat: "Procesadores", baseCompra: 750000, desc: "Procesador de escritorio multinúcleo" },
  { nombre: "Procesador Ryzen 7", marca: "AMD", cat: "Procesadores", baseCompra: 1100000, desc: "Procesador de alto desempeño para gaming y edición" },
  { nombre: "Tarjeta Gráfica GeForce RTX", marca: "NVIDIA", cat: "Tarjetas gráficas", baseCompra: 1950000, desc: "GPU con trazado de rayos en tiempo real" },
  { nombre: "Tarjeta Gráfica Radeon RX", marca: "AMD", cat: "Tarjetas gráficas", baseCompra: 1600000, desc: "Tarjeta de video para videojuegos en alta resolución" },
  { nombre: "Memoria RAM Fury DDR4", marca: "Kingston", cat: "Memorias y almacenamiento", baseCompra: 140000, desc: "Módulo de memoria RAM de alta velocidad" },
  { nombre: "Disco SSD NVMe 980", marca: "Samsung", cat: "Memorias y almacenamiento", baseCompra: 280000, desc: "Unidad de estado sólido PCIe de lectura rápida" },
  { nombre: "Disco SSD A400", marca: "Kingston", cat: "Memorias y almacenamiento", baseCompra: 180000, desc: "Unidad SSD SATA para mejorar el arranque" },
  { nombre: "Mouse Inalámbrico MX", marca: "Logitech", cat: "Periféricos", baseCompra: 190000, desc: "Mouse ergonómico de alta precisión" },
  { nombre: "Teclado Mecánico Alloy", marca: "HyperX", cat: "Periféricos", baseCompra: 260000, desc: "Teclado mecánico retroiluminado" },
  { nombre: "Audífonos Gamer G435", marca: "Logitech", cat: "Periféricos", baseCompra: 220000, desc: "Audífonos inalámbricos con micrófono integrado" },
  { nombre: "Monitor Odyssey 24\"", marca: "Samsung", cat: "Monitores", baseCompra: 680000, desc: "Monitor Full HD de 144Hz" },
  { nombre: "Monitor UltraGear 27\"", marca: "LG", cat: "Monitores", baseCompra: 920000, desc: "Monitor IPS ideal para diseño y juegos" },
  { nombre: "Router Wi-Fi 6 Archer", marca: "TP-Link", cat: "Redes y conectividad", baseCompra: 240000, desc: "Router doble banda de alta cobertura" },
  { nombre: "Hub USB-C Multipuerto", marca: "Ugreen", cat: "Accesorios tecnológicos", baseCompra: 95000, desc: "Adaptador multipuerto con HDMI y USB 3.0" },
  { nombre: "Cámara Web C920", marca: "Logitech", cat: "Accesorios tecnológicos", baseCompra: 270000, desc: "Cámara web Full HD 1080p para videollamadas" }
];

const variantes = ["Edición Estándar", "Serie Pro", "Serie Plus", "Edición 2025", "Edición Ultra"];
const listaProductos = [];
let contador = 1;

catalogoBase.forEach((item, idx) => {
  variantes.forEach((varNombre, vIdx) => {
    const compra = item.baseCompra + (vIdx * 120000);
    const venta = Math.round(compra * 1.25);
    const stockMin = 5;
    let stockActual = (contador * 3) % 25;
    let estadoProd = "disponible";

    if (contador % 17 === 0) {
      stockActual = 0;
      estadoProd = "agotado";
    } else if (contador % 29 === 0) {
      stockActual = 0;
      estadoProd = "descontinuado";
    }

    listaProductos.push({
      nombre: `${item.nombre} ${varNombre}`,
      marca: item.marca,
      modelo: `TN-${item.marca.substring(0, 3).toUpperCase()}-${100 + contador}`,
      categoria_id: cats[item.cat],
      proveedor_id: provs[(idx + vIdx) % provs.length],
      descripcion: `${item.desc} - ${varNombre}.`,
      precio_compra: compra,
      precio_venta: venta,
      stock: stockActual,
      stock_minimo: stockMin,
      estado: estadoProd,
      fecha_registro: new Date(2026, (contador % 10), (contador % 28) + 1)
    });
    contador++;
  });
});

db.productos.insertMany(listaProductos);
print("Total de productos insertados:", db.productos.countDocuments());

// ----------------------------------------------------------------------------
// ETAPA 6: Inserción de 30 movimientos de inventario coherentes
// ----------------------------------------------------------------------------
const productosDisponibles = db.productos.find({ stock: { $gte: 3 } }).limit(30).toArray();
const responsables = ["Juan Pérez", "María López", "Carlos Ruiz", "Ana Torres"];
const tipos = ["entrada", "salida", "ajuste"];
const movimientos = [];

productosDisponibles.forEach((prod, i) => {
  const tipo = tipos[i % 3];
  let cantidad = (i % 4) + 1;
  let stockAnterior = 0;
  let stockNuevo = prod.stock;
  let motivo = "";

  if (tipo === "entrada") {
    if (cantidad > prod.stock) cantidad = prod.stock;
    stockAnterior = prod.stock - cantidad;
    motivo = "Compra y reposición de mercancía a proveedor";
  } else if (tipo === "salida") {
    stockAnterior = prod.stock + cantidad;
    motivo = "Venta realizada en tienda";
  } else {
    stockAnterior = prod.stock - 1;
    cantidad = 1;
    motivo = "Ajuste por conteo físico de inventario";
  }

  movimientos.push({
    producto_id: prod._id,
    tipo_movimiento: tipo,
    cantidad: cantidad,
    stock_anterior: stockAnterior,
    stock_nuevo: stockNuevo,
    motivo: motivo,
    fecha: new Date(2026, 10, (i % 15) + 1),
    responsable: responsables[i % responsables.length]
  });
});

db.movimientos_inventario.insertMany(movimientos);
print("Total movimientos insertados:", db.movimientos_inventario.countDocuments());

// ----------------------------------------------------------------------------
// ETAPA 7 Y 8: Operaciones CRUD (Insertar, Consultar, Actualizar y Eliminar)
// ----------------------------------------------------------------------------

// 7.1 Inserción individual (insertOne)
db.productos.insertOne({
  nombre: "Teclado Mecánico G Pro X",
  marca: "Logitech",
  modelo: "TN-LOG-999",
  categoria_id: cats["Periféricos"],
  proveedor_id: provs[0],
  descripcion: "Teclado mecánico compacto para eSports con switches intercambiables.",
  precio_compra: 380000,
  precio_venta: 490000,
  stock: 12,
  stock_minimo: 5,
  estado: "disponible",
  fecha_registro: new Date()
});

// 7.2 Selección por marca con proyección (find)
db.productos.find(
  { marca: "Logitech" },
  { nombre: 1, modelo: 1, precio_venta: 1, stock: 1, estado: 1, _id: 0 }
);

// 7.3 Alerta de inventario: productos con stock inferior al stock_minimo ($expr)
db.productos.find(
  { $expr: { $lt: ["$stock", "$stock_minimo"] } },
  { nombre: 1, modelo: 1, stock: 1, stock_minimo: 1, estado: 1, _id: 0 }
).limit(10);

// 8.1 Actualización puntual (updateOne)
db.productos.updateOne(
  { modelo: "TN-LOG-999" },
  { $set: { precio_venta: 520000, stock: 15 } }
);

// 8.2 Actualización masiva para mantener consistencia de estados (updateMany)
db.productos.updateMany(
  { stock: 0, estado: "disponible" },
  { $set: { estado: "agotado" } }
);

// 8.3 Eliminación controlada del producto de prueba sin movimientos asociados (deleteOne)
db.productos.deleteOne({ modelo: "TN-LOG-999" });

// ----------------------------------------------------------------------------
// ETAPA 9: Consultas y filtros avanzados
// ----------------------------------------------------------------------------

// 9.1 Productos de alto valor (> $1.000.000 COP) con bajo stock (< 10)
db.productos.find(
  { precio_venta: { $gt: 1000000 }, stock: { $lt: 10 } },
  { nombre: 1, marca: 1, precio_venta: 1, stock: 1, _id: 0 }
).limit(5);

// 9.2 Operadores lógicos y de pertenencia ($and, $in, $gte)
db.productos.find(
  {
    $and: [
      { marca: { $in: ["ASUS", "Lenovo"] } },
      { estado: "disponible" },
      { stock: { $gte: 5 } }
    ]
  },
  { nombre: 1, marca: 1, precio_venta: 1, stock: 1, estado: 1, _id: 0 }
).limit(5);

// 9.3 Búsqueda flexible por expresión regular o precio máximo ($or, $regex, $lte)
db.productos.find(
  {
    $or: [
      { nombre: { $regex: "SSD", $options: "i" } },
      { precio_venta: { $lte: 250000 } }
    ]
  },
  { nombre: 1, marca: 1, precio_venta: 1, stock: 1, _id: 0 }
).limit(5);

// ----------------------------------------------------------------------------
// ETAPA 10: Agregaciones (aggregate) y uniones ($lookup)
// ----------------------------------------------------------------------------

// 10.1 Resumen financiero global del inventario
db.productos.aggregate([
  {
    $group: {
      _id: null,
      total_productos: { $sum: 1 },
      total_unidades: { $sum: "$stock" },
      valor_total_inventario: { $sum: { $multiply: ["$precio_compra", "$stock"] } },
      promedio_precio_venta: { $avg: "$precio_venta" }
    }
  },
  {
    $project: {
      _id: 0,
      total_productos: 1,
      total_unidades: 1,
      valor_total_inventario: 1,
      promedio_precio_venta: { $round: ["$promedio_precio_venta", 0] }
    }
  }
]);

// 10.2 Cantidad de productos y valoración del inventario por categoría ($lookup)
db.productos.aggregate([
  {
    $lookup: {
      from: "categorias",
      localField: "categoria_id",
      foreignField: "_id",
      as: "info_categoria"
    }
  },
  { $unwind: "$info_categoria" },
  {
    $group: {
      _id: "$info_categoria.nombre",
      cantidad_productos: { $sum: 1 },
      unidades_en_stock: { $sum: "$stock" },
      valor_inventario: { $sum: { $multiply: ["$precio_compra", "$stock"] } }
    }
  },
  { $sort: { valor_inventario: -1 } }
]);

// 10.3 Resumen de movimientos de inventario por tipo (entrada, salida, ajuste)
db.movimientos_inventario.aggregate([
  {
    $group: {
      _id: "$tipo_movimiento",
      total_movimientos: { $sum: 1 },
      unidades_movidas: { $sum: "$cantidad" }
    }
  },
  { $sort: { unidades_movidas: -1 } }
]);