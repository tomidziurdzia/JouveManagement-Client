interface Options {
  weekday: string;
  year: string;
  month: string;
  day: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDate = (date: string) => {
  const fecha = new Date(date);
  const options: Options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return fecha.toLocaleDateString("es-ES", options as any);
};
