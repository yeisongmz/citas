import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button} from 'react-native';
import Cita from './componentes/Citas';


const App = () => {
  // definir el state
  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No Come'},
    {id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No Duerme'},
    {id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No Canta'},
  ]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
  
    //console.log('se eliminará: ', id)
    setCitas( (citasActuales) => {

      console.log('Imprimo antes de filtrar: ', citasActuales)
      citasActuales = citasActuales.filter( cita => cita.id !== id )
      console.log('imprimo despues de filtar: ', citasActuales)

      return citasActuales
      } 
    )
    console.log('Se eliminó: ', id)
  }


//Agregar pacientes
/*   const agregarPacientes = () => {
    setCitas( (citasActuales) => {
      let count = 0
      citasActuales = citasActuales
      console.log('comienza la carga de pacientes')
      while ( count <= 100 ) {
          count = citasActuales.push(citasActuales)
      }
      return citasActuales
    } 
    )
    console.log('los pacientes fueron agregados')
  } */

  return (
    
    <View style={styles.contenedor}>
      <Text style={styles.titulo}> Aministrador de citas </Text>
      {/*<Button title='Agregar' onPress={ agregarPacientes}  />*/}
      <Text style={styles.titulo}> { citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una!' } </Text>

      <FlatList
        data={citas}
        renderItem={ ({item}) => <Cita cita={item} pacienteEliminar={eliminarPaciente} /> }
        keyExtractor={ cita => cita.id }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },

  titulo: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});


export default App;
