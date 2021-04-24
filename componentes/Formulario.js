import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableHighlight, Alert, ScrollView,} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

//componente formulario
const Formulario = ( {citas, setCitas, guardarMostrarForm} ) => {
    
    
    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [sintomas, guardarSintomas] = useState('');


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit', hour12: false };
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    // muestra o oculta el time picker

    const showTimePicker = () => {
        //console.log('entró');
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hora) => {
        const opciones = { hour: 'numeric', minute: '2-digit' };
        guardarHora(hora.toLocaleString('en-US', opciones));
        hideTimePicker();
       // console.log('fin')
    };

    //crear nueva cota

    const crearNuevaCita = () => {
        console.log('ha presionado el boton crear nueva cita');
        if (paciente.trim() === '' ||
            propietario.trim() === '' ||
            telefono.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === '') {
            //falla la validacion
            console.log('ha fallado crear nueva cita');
            return;
            }

        // pasa la validacion
         
        const cita = { paciente, propietario, telefono, fecha, hora, sintomas }
        cita.id = shortid.generate();
        //console.warn(cita)
        // Agregar citas al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        //ocultar el formulario
        guardarMostrarForm(false);
        //resetear el formulario

    };


    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.imput}
                        onChangeText={texto => guardarPaciente(texto)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput
                        style={styles.imput}
                        onChangeText={texto => guardarPropietario(texto)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Telefono Contacto:</Text>
                    <TextInput
                        style={styles.imput}
                        onChangeText={texto => guardarTelefono(texto)}
                        keyboardType="numeric"
                    />
                </View>

                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale="es_ES"
                    />
                    <Text>{fecha}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale="es_ES"
                        is24Hour
                    />
                    <Text>{hora}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput
                        style={styles.imput}
                        multiline
                        onChangeText={texto => guardarSintomas(texto)}
                    />
                </View>

                <View>
                    <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
                        <Text style={styles.textobtnSubmit}>Crear Nueva Cita</Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,

    },

    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    imput: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
    },

    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10,
    },

    textobtnSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Formulario;
