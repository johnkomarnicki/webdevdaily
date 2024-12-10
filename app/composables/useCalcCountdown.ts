export const useCalcCountdown = () => {
  const timeRemaining = ref();

  const calcTimeRemaining = () => {
    const now = new Date();
    const currentDayOfWeek = now.getUTCDay();
    let daysToAdd = (7 - currentDayOfWeek + 1) % 7;
    if (currentDayOfWeek === 1 && now.getUTCHours() >= 13) {
      daysToAdd = 7;
    }
    const targetTime = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysToAdd, 13, 0, 0)
    );

    let remainingTime = targetTime.getTime() - now.getTime();

    if (remainingTime < 0) {
      remainingTime += 24 * 60 * 60 * 1000;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    if (days === 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  timeRemaining.value = calcTimeRemaining();

  onMounted(() => {
    setInterval(() => {
      timeRemaining.value = calcTimeRemaining();
    }, 1000);
  });

  return { calcTimeRemaining, timeRemaining };
};
