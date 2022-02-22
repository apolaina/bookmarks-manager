export function formatDuration(durationInSeconds: number) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds - hours * 3600) / 60);
  const seconds = durationInSeconds - hours * 3600 - minutes * 60;

  const displayedH = hours > 0 ? hours + ':' : '';
  const displayedM = minutes > 0 ? minutes + ':' : '';
  const displayedS = seconds > 0 ? seconds : '';
  return displayedH + displayedM + displayedS;
}
