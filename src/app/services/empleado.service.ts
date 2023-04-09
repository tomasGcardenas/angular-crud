import { ElementRef, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, getDoc, docSnapshots, collectionSnapshots, snapToData, documentId } from '@angular/fire/firestore';
import { CollectionReference, orderBy, updateDoc, getFirestore, DocumentSnapshot, snapshotEqual, onSnapshotsInSync } from 'firebase/firestore';
import { Observable } from 'rxjs' ;

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  // const docRef = doc(this.firestore, "empleados", "id");
  // const docSnap = await getDoc(this.docRef);

  constructor(private firestore: Firestore) { }

  agregarEmpleado(empleado: any): Promise<any>{
    const empleadoRef = collection(this.firestore, 'empleados')
    return addDoc(empleadoRef, empleado)
  }

  getEmpleados(): Observable<any>{
    const empleadoRef = collection(this.firestore, 'empleados')
    return collectionData(empleadoRef, {idField: 'id'})
  }

  eliminarEmpleado(id:string): Promise <any>{
    const deleteEmpleadoRef = doc(this.firestore, `empleados/${id}`)
    return deleteDoc(deleteEmpleadoRef);
  }

  getEmpleado(id:string): Observable <any>{
    const deleteEmpleadoRef = doc(this.firestore, `empleados/${id}`)
    return docSnapshots(deleteEmpleadoRef);
  }

  actualizarEmpleado(id: string, data:any): Promise <any> {
    const actualizar = doc(this.firestore, `empleados/${id}`)
    return updateDoc(actualizar, data)
  }

}
