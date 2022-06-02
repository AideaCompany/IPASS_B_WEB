// Configuration
import config from './config.json'

interface ISecurity {
  secretKey: string
  expiresIn: string
  card: string
}

// Configurations
const { security } = config

export const $security: ISecurity = security
