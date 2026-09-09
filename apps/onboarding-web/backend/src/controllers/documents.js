import fs from 'node:fs/promises';
import path from 'node:path';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';

const view = d => ({ id:d.id, documentType:d.documentType, originalName:d.originalName, mimeType:d.mimeType, size:d.size, createdAt:d.createdAt, updatedAt:d.updatedAt });
export async function upload(req,res){ if(!req.file)return res.status(400).json({message:'File is required.'}); const documentType=Number(req.body.DocumentType ?? req.body.documentType); if(!Number.isInteger(documentType))return res.status(400).json({message:'DocumentType is required.'}); const d=await prisma.document.create({data:{userId:req.user.id,documentType,originalName:req.file.originalname,storedName:req.file.filename,mimeType:req.file.mimetype,size:req.file.size,path:req.file.path}}); res.status(201).json(view(d)); }
export async function list(req,res){res.json((await prisma.document.findMany({where:{userId:req.user.id},orderBy:{createdAt:'desc'}})).map(view))}
export async function get(req,res){const d=await prisma.document.findFirst({where:{id:req.params.id,userId:req.user.id}});if(!d)return res.status(404).json({message:'Document not found.'});res.json(view(d))}
async function removeFile(p){try{await fs.unlink(p)}catch{}}
export async function update(req,res){const d=await prisma.document.findFirst({where:{id:req.params.id,userId:req.user.id}});if(!d)return res.status(404).json({message:'Document not found.'});const documentType=Number(req.body.DocumentType ?? req.body.documentType ?? d.documentType);const data={documentType};if(req.file){await removeFile(d.path);Object.assign(data,{originalName:req.file.originalname,storedName:req.file.filename,mimeType:req.file.mimetype,size:req.file.size,path:req.file.path})}const x=await prisma.document.update({where:{id:d.id},data});res.json(view(x))}
export async function remove(req,res){const d=await prisma.document.findFirst({where:{id:req.params.id,userId:req.user.id}});if(!d)return res.status(404).json({message:'Document not found.'});await removeFile(d.path);await prisma.document.delete({where:{id:d.id}});res.json({message:'Document deleted.'})}
export async function download(req,res){const d=await prisma.document.findFirst({where:{id:req.params.id,userId:req.user.id}});if(!d)return res.status(404).json({message:'Document not found.'});res.download(path.resolve(d.path),d.originalName)}
export async function reupload(req,res){return update(req,res)}
