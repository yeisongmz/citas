import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import Cita from './componentes/Citas';
import Formulario from './componentes/Formulario';


const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(false);
  // definir el state
  const [citas, setCitas] = useState([

    {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No Come'},
    {id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No Duerme'},
    {id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No Canta'},
  ]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {

    //console.log('se eliminará: ', id)
    setCitas((citasActuales) => {

      console.log('Imprimo antes de filtrar: ', citasActuales)
      citasActuales = citasActuales.filter(cita => cita.id !== id)
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


  // Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }
  const cerrarTeclado = () => {
    Keyboard.dismiss();
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
                guardarMostrarForm={guardarMostrarForm} />
              
            </>
          ) :
            (
              <>
                <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una!'} </Text>

                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({ item }) => <Cita cita={item} pacienteEliminar={eliminarPaciente} />}
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
