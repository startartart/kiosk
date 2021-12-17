module.exports =(sequelize, DataTypes) => {
    return sequelize.define('food', {
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      what: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      single_price: {
        type: DataTypes.STRING(20),
      },
      set_price: {
        type: DataTypes.STRING(20),
      },
      picture: {
        type: DataTypes.STRING(50),
      },
      preference: {
        type: DataTypes.INTEGER(10),
      },
      mark: {
        type: DataTypes.STRING(20),
      },
    }, {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
      });
    };