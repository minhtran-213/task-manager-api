const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { userFake, userFakeId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('should sign up a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Hoang Minh',
      email: 'baotranminh2001@gmail.com',
      password: 'minhtran213010101',
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);

  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: 'Hoang Minh',
      email: 'baotranminh2001@gmail.com',
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe('minhtran213010101');
});

test('should login success', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userFake.email,
      password: userFake.password,
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(user.tokens[1]).not.toBeNull;
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('should login failed - bad credential', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userFake.email,
      password: 'test12345',
    })
    .expect(400);
});

test('should get user profile successful', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userFake.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should get user profile successful', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('should delete user successful', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userFake.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userFake._id);
  expect(user).toBeNull();
});

test('should delete user successful', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('should upload avatar', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userFake.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/wallhaven-72rxqo.jpg')
    .expect(200);

  const user = await User.findById(userFakeId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update user success', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userFake.tokens[0].token}`)
    .send({
      name: 'Minh Tran Bao',
    })
    .expect(200);

  const user = await User.findById(userFakeId);
  expect(user.name).toBe('Minh Tran Bao');
});

test('should update user success', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userFake.tokens[0].token}`)
    .send({
      location: 'HCM',
    })
    .expect(400);
});
