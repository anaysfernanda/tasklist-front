import UserType from './UserType';

const getUserList = (): UserType[] => JSON.parse(localStorage.getItem('users') || '[]');

export default getUserList;
