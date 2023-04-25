export const runPagination = ({ page, limit }: { page?: number; limit?: number }) => {
  const p = Math.abs(Number(page) ?? 1);
  const l = Math.abs(Number(limit) ?? 0);
  const skip = p * l - l;
  return {
    skip,
  };
};
