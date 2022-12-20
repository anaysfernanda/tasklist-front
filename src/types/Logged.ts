const Logged = (): string => localStorage.getItem('logged') || '';

export default Logged;
