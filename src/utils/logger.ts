export class Logger {
  static info(message: string): void {
    console.log(`ℹ️  [INFO] ${new Date().toISOString()} - ${message}`);
  }

  static error(message: string): void {
    console.error(`❌ [ERROR] ${new Date().toISOString()} - ${message}`);
  }

  static warn(message: string): void {
    console.warn(`⚠️  [WARN] ${new Date().toISOString()} - ${message}`);
  }

  static debug(message: string): void {
    if (process.env.DEBUG) {
      console.log(`🐛 [DEBUG] ${new Date().toISOString()} - ${message}`);
    }
  }

  static step(message: string): void {
    console.log(`🔄 [STEP] ${message}`);
  }
}