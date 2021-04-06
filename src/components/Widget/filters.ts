export default {
  getFirstLoaderData: <T extends unknown>(data: T[]): T => {
    return data[0];
  },
};
