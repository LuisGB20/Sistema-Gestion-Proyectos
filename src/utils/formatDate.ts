export const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);
  
    // Verificar si la fecha es válida
    if (isNaN(parsedDate.getTime())) {
      // Si no es válida, retorna un valor por defecto o un mensaje de error
      return 'Fecha inválida';
    }
  
    // Si es válida, formatea la fecha
    return parsedDate.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  