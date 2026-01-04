/**
 * Convertit une date française en timestamp
 * Format attendu: "28 octobre 2023" ou "25 octobre 2023"
 */
export function parseFrenchDate(dateString: string): number {
  const months: { [key: string]: number } = {
    janvier: 0,
    février: 1,
    mars: 2,
    avril: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    août: 7,
    septembre: 8,
    octobre: 9,
    novembre: 10,
    décembre: 11,
  };

  const parts = dateString.trim().toLowerCase().split(/\s+/);
  
  if (parts.length < 3) {
    // Si le format n'est pas reconnu, retourner la date actuelle
    return Date.now();
  }

  const day = parseInt(parts[0], 10);
  const monthName = parts[1];
  const year = parseInt(parts[2], 10);

  const month = months[monthName];
  
  if (isNaN(day) || isNaN(year) || month === undefined) {
    return Date.now();
  }

  const date = new Date(year, month, day);
  return date.getTime();
}

/**
 * Formate un timestamp en date française
 */
export function formatFrenchDate(timestamp: number): string {
  const date = new Date(timestamp);
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Formate une date relative (ex: "Il y a 2 jours")
 */
export function formatRelativeDate(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (days > 30) {
    return formatFrenchDate(timestamp);
  } else if (days > 0) {
    return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `Il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return "À l'instant";
  }
}

