import * as crypto from 'crypto';
// @ts-ignore
import * as uuid from 'uuid';

export function generateHash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
}

export function generateUUID(): string {
    return uuid.v4();
}