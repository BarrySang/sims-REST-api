const express = require('express');
const app = express();
const chargesRoutes = require('./routes/charges');
const depositsRoutes = require('./routes/deposits');
const statusesRoutes = require('./routes/statuses');
const structuresRoutes = require('./routes/structures');
// const studentsRoutes = require('./routes/students');

app.use(express.json());

app.use('/charges', chargesRoutes);
app.use('/deposits', depositsRoutes);
app.use('/statuses', statusesRoutes);
app.use('/structures', structuresRoutes);
// app.use('/students', studentsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
