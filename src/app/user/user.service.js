import angular from 'angular';

class UserService {
    constructor() {
        this.users = [
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=1' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?img=2' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', avatar: 'https://i.pravatar.cc/150?img=3' },
            { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', avatar: 'https://i.pravatar.cc/150?img=4' },
            { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?img=5' }
        ];
    }

    getAll() {
        return angular.copy(this.users);
    }

    getById(id) {
        return angular.copy(this.users.find(u => u.id === parseInt(id)));
    }

    create(user) {
        const newUser = {
            ...user,
            id: Math.max(...this.users.map(u => u.id)) + 1,
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        };
        this.users.push(newUser);
        return angular.copy(newUser);
    }

    update(id, userData) {
        const index = this.users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...userData };
            return angular.copy(this.users[index]);
        }
        return null;
    }

    delete(id) {
        const index = this.users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}



export default UserService;