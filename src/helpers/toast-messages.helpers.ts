type EntityName = string

const fallbackEntity = "registro"

const normalizeEntity = (entity?: EntityName) => entity?.trim() || fallbackEntity

export const toastCrudMessages = {
  success: {
    create: (entity?: EntityName) => `${normalizeEntity(entity)} creado correctamente.`,
    read: (entity?: EntityName) => `${normalizeEntity(entity)} cargado correctamente.`,
    update: (entity?: EntityName) => `${normalizeEntity(entity)} actualizado correctamente.`,
    delete: (entity?: EntityName) => `${normalizeEntity(entity)} eliminado correctamente.`,
    restore: (entity?: EntityName) => `${normalizeEntity(entity)} restaurado correctamente.`,
  },
  error: {
    create: (entity?: EntityName) => `No se pudo crear ${normalizeEntity(entity)}.`,
    requiredFieldsForCreate: (entity?: EntityName) =>
      `Completa los campos obligatorios para crear ${normalizeEntity(entity)}.`,
    read: (entity?: EntityName) => `No se pudo cargar ${normalizeEntity(entity)}.`,
    update: (entity?: EntityName) => `No se pudo actualizar ${normalizeEntity(entity)}.`,
    delete: (entity?: EntityName) => `No se pudo eliminar ${normalizeEntity(entity)}.`,
    restore: (entity?: EntityName) => `No se pudo restaurar ${normalizeEntity(entity)}.`,
    unexpected: "Ocurrio un error inesperado. Intenta nuevamente.",
  },
  loading: {
    create: (entity?: EntityName) => `Creando ${normalizeEntity(entity)}...`,
    read: (entity?: EntityName) => `Cargando ${normalizeEntity(entity)}...`,
    update: (entity?: EntityName) => `Actualizando ${normalizeEntity(entity)}...`,
    delete: (entity?: EntityName) => `Eliminando ${normalizeEntity(entity)}...`,
    restore: (entity?: EntityName) => `Restaurando ${normalizeEntity(entity)}...`,
  },
  confirm: {
    delete: (entity?: EntityName) =>
      `Estas seguro de eliminar ${normalizeEntity(entity)}? Esta accion no se puede deshacer.`,
    restore: (entity?: EntityName) =>
      `Estas seguro de restaurar ${normalizeEntity(entity)}?`,
  },
}

export const toastAuthMessages = {
  success: {
    login: "Inicio de sesion exitoso.",
  },
  error: {
    login: "No se pudo iniciar sesion.",
  },
}

export type ToastCrudMessages = typeof toastCrudMessages
