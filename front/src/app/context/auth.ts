export const useGetToken = (): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  const token = match ? match[2] : null;
  return token;
};