export const getFoodImage = (title = "") => {
  const name = title.toLowerCase();

  if (name.includes("biryani") || name.includes("biriyani")) {
    return "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=80";
  }

  if (name.includes("idli")) {
    return "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80";
  }

  if (name.includes("dosa")) {
    return "https://images.unsplash.com/photo-1694849789672-8c4e8f302ff0?auto=format&fit=crop&w=900&q=80";
  }

  if (name.includes("chapati") || name.includes("roti")) {
    return "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80";
  }

  if (name.includes("rice")) {
    return "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80";
  }

  return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";
};