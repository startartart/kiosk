module.exports =(sequelize, DataTypes) => {
    return sequelize.define('basket', {
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER(20),
      },
      quantity: {
        type: DataTypes.INTEGER(10),
      },
    }, {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
      });
    };