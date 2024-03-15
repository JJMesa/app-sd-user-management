import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { JsonResponse } from '../models/response.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_PATH = environment.API_PATH;
  private readonly API_USER_PATH = `${this.API_PATH}/api/users`;

  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios
  getAllUsers(): Observable<JsonResponse<User[]>> {
    return this.http.get<JsonResponse<User[]>>(this.API_USER_PATH);
  }

  // Método para obtener un usuario por su ID
  getUserById(id: number): Observable<JsonResponse<User>> {
    return this.http.get<JsonResponse<User>>(`${this.API_USER_PATH}/${id}`);
  }

  // Método para crear un nuevo usuario
  createUser(userData: User): Observable<JsonResponse<User>> {
    return this.http.post<JsonResponse<User>>(this.API_USER_PATH, userData);
  }

  // Método para actualizar un usuario existente
  updateUser(id: number, userData: User): Observable<JsonResponse<User>> {
    return this.http.put<JsonResponse<User>>(`${this.API_USER_PATH}/${id}`, userData);
  }

  // Método para eliminar un usuario
  deleteUser(id: number): Observable<JsonResponse<boolean>> {
    return this.http.delete<JsonResponse<boolean>>(`${this.API_USER_PATH}/${id}`);
  }
}
