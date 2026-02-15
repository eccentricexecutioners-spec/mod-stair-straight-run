import jwt from 'jsonwebtoken';

export interface ModuleToken {
  user_id: string;
  user_role: 'admin' | 'provider' | 'client';
  project_id: string;
  module_permissions: string[];
  parent_site: string;
  exp: number;
}

export function validateModuleToken(token: string): ModuleToken {
  if (!process.env.EE_MODULE_SECRET) {
    throw new Error('EE_MODULE_SECRET not configured');
  }
  return jwt.verify(token, process.env.EE_MODULE_SECRET) as ModuleToken;
}
