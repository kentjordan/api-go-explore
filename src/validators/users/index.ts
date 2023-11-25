import { z } from 'zod';

const userId = z.object({
    user_id: z.string().uuid()
}).strict();

const createUser = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    gender: z.string().min(4),
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'REGULAR']),
    from_country: z.string().min(1),
    current_province: z.string().min(1),
    current_city: z.string().min(1),
    profile_photo: z.string().optional()
}).strict();

const updateUser = z.object({
    first_name: z.string().min(1).optional(),
    last_name: z.string().min(1).optional(),
    password: z.string().min(8).optional(),
    gender: z.string().min(4).optional(),
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'REGULAR']).optional(),
    from_country: z.string().min(1).optional(),
    current_province: z.string().min(1).optional(),
    current_city: z.string().min(1).optional(),
    profile_photo: z.string().optional()
}).strict();

const userRoleQuery = z.object({
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'REGULAR'])
}).strict();

export {
    userId,
    createUser,
    updateUser,
    userRoleQuery
}