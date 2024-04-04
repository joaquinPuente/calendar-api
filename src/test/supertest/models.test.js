// src/test/models.test.js
import { expect } from 'chai';
import mongoose from 'mongoose';
import userModel from '../../dao/models/user.model.js';
import dateModel from '../../dao/models/date.model.js';

describe('Models Testing', () => {
  before(async () => {
    // Conectar a la base de datos de prueba o configurar una conexión de prueba
    await mongoose.connect('mongodb://localhost:27017/test');
  });

  after(async () => {
    // Desconectar de la base de datos después de las pruebas
    await mongoose.disconnect();
  });

  it('should add a user', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    };

    const user = new userModel(userData);
    await user.save();

    const savedUser = await userModel.findOne({ email: 'john.doe@example.com' });
    expect(savedUser.first_name).to.equal('John');
    expect(savedUser.last_name).to.equal('Doe');
    expect(savedUser.email).to.equal('john.doe@example.com');
  });

  it('should add a date for a user', async () => {
    const user = await userModel.findOne({ email: 'john.doe@example.com' });

    const dateData = {
      title: 'Meeting',
      description: 'Team meeting',
      date: new Date(), // Utiliza la fecha actual como ejemplo
      user: user._id
    };

    const date = new dateModel(dateData);
    await date.save();

    const savedDate = await dateModel.findOne({ title: 'Meeting' });
    expect(savedDate.title).to.equal('Meeting');
    expect(savedDate.description).to.equal('Team meeting');
    expect(savedDate.user.toString()).to.equal(user._id.toString());
  });
});
