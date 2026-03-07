import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

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
  try {
    return jwt.verify(token, process.env.EE_MODULE_SECRET) as ModuleToken;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export function getTokenFromRequest(req: NextRequest): ModuleToken {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }
  const token = authHeader.substring(7);
  return validateModuleToken(token);
}

export function unauthorizedResponse() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
