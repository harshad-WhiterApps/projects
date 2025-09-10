import { AuditLog } from '../types/audit';
import authService from './auth';

class AuditService {
  private static instance: AuditService;
  private logs: AuditLog[] = [];

  static getInstance(): AuditService {
    if (!AuditService.instance) {
      AuditService.instance = new AuditService();
    }
    return AuditService.instance;
  }

  async logAction(
    action: string,
    resource: string,
    resourceId: string,
    details?: Record<string, any>
  ): Promise<void> {
    const user = authService.getAuthState().user;
    if (!user) return;

    const auditLog: AuditLog = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      action,
      resource,
      resourceId,
      details: details || {},
      ipAddress: '127.0.0.1', // In production, get from request
      userAgent: navigator.userAgent,
      timestamp: new Date()
    };

    this.logs.unshift(auditLog);
    
    // In production, this would send to secure audit storage
    console.log('Audit Log:', auditLog);
  }

  async getLogs(filters?: {
    userId?: string;
    action?: string;
    resource?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<AuditLog[]> {
    let filteredLogs = [...this.logs];

    if (filters) {
      if (filters.userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
      }
      if (filters.action) {
        filteredLogs = filteredLogs.filter(log => log.action.includes(filters.action!));
      }
      if (filters.resource) {
        filteredLogs = filteredLogs.filter(log => log.resource === filters.resource);
      }
      if (filters.startDate) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        filteredLogs = filteredLogs.filter(log => log.timestamp <= filters.endDate!);
      }
    }

    return filteredLogs;
  }
}

export default AuditService.getInstance();