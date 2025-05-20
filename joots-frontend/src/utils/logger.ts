type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogData = string | number | object | null | undefined;

interface LogMessage {
  level: LogLevel;
  message: string;
  data?: LogData;
  timestamp: string;
}

class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;
  // Définir les méthodes de console que nous utilisons
  private console: Console;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.console = console;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatData(data: LogData): string {
    if (!data) return '';
    try {
      // Si c'est une chaîne simple ou un nombre, on l'intègre directement
      if (typeof data === 'string' || typeof data === 'number') {
        return ` ${data}`;
      }
      // Pour les objets, on les formate sur une nouvelle ligne
      return '\n' + JSON.stringify(data, null, 2);
    } catch {
      return ' [Non sérialisable]';
    }
  }

  private formatMessage(level: LogLevel, message: string, data?: LogData): LogMessage {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }

  private log(level: LogLevel, message: string, data?: LogData): void {
    if (this.isDevelopment) {
      const logMessage = this.formatMessage(level, message, data);
      const formattedData = this.formatData(data);
      const consoleMessage = `[${logMessage.timestamp}] ${level.toUpperCase()}: ${message}${formattedData}`;
      
      switch (level) {
        case 'debug':
          this.console.log(consoleMessage);
          break;
        case 'info':
          this.console.log(consoleMessage);
          break;
        case 'warn':
          this.console.warn(consoleMessage);
          break;
        case 'error':
          this.console.log(consoleMessage);
          break;
      }
    }
    // En production, on pourrait envoyer les logs à un service comme Sentry
    // ou les stocker dans une base de données
  }

  public debug(message: string, data?: LogData): void {
    this.log('debug', message, data);
  }

  public info(message: string, data?: LogData): void {
    this.log('info', message, data);
  }

  public warn(message: string, data?: LogData): void {
    this.log('warn', message, data);
  }

  public error(message: string, data?: LogData): void {
    this.log('error', message, data);
  }
}

export const logger = Logger.getInstance(); 