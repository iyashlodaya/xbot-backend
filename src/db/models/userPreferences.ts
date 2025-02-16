import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './index';


// Define model interface
interface UserPreferencesAttributes {
  id: number;
  user_id: number;
  tone: string;
  length: string;
  language: string;
  hashtags: boolean;
  emojis: boolean;
}

interface UserPreferencesCreationAttributes extends Optional<UserPreferencesAttributes, "id"> {}

class UserPreferences extends Model<UserPreferencesAttributes, UserPreferencesCreationAttributes> {
  public id!: number;
  public user_id!: number;
  public tone!: string;
  public length!: string;
  public language!: string;
  public hashtags!: boolean;
  public emojis!: boolean;
}

UserPreferences.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tone: {
      type: DataTypes.STRING,
      defaultValue: 'informative',
    },
    length: {
      type: DataTypes.STRING,
      defaultValue: 'short',
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: 'English',
    },
    hashtags: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    emojis: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'user_preferences',
  }
);

export default UserPreferences;
