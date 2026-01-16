/**
 * Verifica se a unidade Magrass está aberta com base no horário de Hortolândia.
 * Seg-Sex: 09:00 - 19:00
 * Sáb: 08:00 - 12:00
 */
export const isBusinessOpen = (): boolean => {
  const now = new Date();
  
  // Ajuste opcional para fuso horário de Brasília se o servidor estiver fora
  // const brTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
  
  const day = now.getDay(); // 0: Dom, 1: Seg, ..., 6: Sáb
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const time = hour + minutes / 60;

  // Segunda a Sexta
  if (day >= 1 && day <= 5) {
    return time >= 9 && time < 19;
  }
  // Sábado
  if (day === 6) {
    return time >= 8 && time < 12;
  }

  return false;
};