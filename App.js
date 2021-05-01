import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import Cita from './componentes/Citas';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  const [citas, setCitas] = useState([

    /*     {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No Come'},
        {id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No Duerme'},
        {id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No Canta'}, */
      ]);
  const [mostrarForm, guardarMostrarForm] = useState(false);

  // definir el state citas


  useEffect(()=>{
    obtenerCitasStorage();
  },[]);


  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    //console.log('se eliminará: ', id)
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  }




  // Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }
  //funcion cerrar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }



  //Almacenar las citas en el storage
  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  }
  //Obtener las citas
  const obtenerCitasStorage = async ()=>{
    try {
      const citasStorage = await AsyncStorage.getItem('citas');
      if (citasStorage){
        setCitas(JSON.parse(citasStorage));
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (

    <TouchableWithoutFeedback onPress={()=> cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}> Aministrador de citas </Text>

        <View>
          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
            <Text style={styles.textobtnSubmit}> {mostrarForm ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'} </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>

          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita </Text>
              
              
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage} />
              
            </>
          ) :
            (
              <>
                <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una!'} </Text>

                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem= { ( {item} ) =>  <Cita cita={item} eliminarPaciente={eliminarPaciente}/> }
                  keyExtractor={cita => cita.id}
                />
              </>
            )
          }




        </View>



      </View>
    </TouchableWithoutFeedback>
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
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,

  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },

  textobtnSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default App;
