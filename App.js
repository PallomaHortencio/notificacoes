import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, SafeAreaView } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

/* Manipulador de eventos de notificações */
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    /* Necessário para IOS */
    async function permissoesIos() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
          allowAnnouncements: true,
        },
      });
    }
    permissoesIos();

    /* Ouvinte de evento para as notificações recebidas, ou seja, quando a notificação aparece no topo da tela do dispositivo */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    /* Ouvinte de evento para as respostas dadas ás notificações, ou seja, quando o usuário interage (toca) na notificação */
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      console.log(resposta);
    });
  }, []);

  const enviarMensagem = async () => {
    const mensagem = {
      title: "Lembrete!",
      body: "Não se esqueça de tomar água!",
      sound: "default", // necessário para ativar o som de ios
    };

    /* Função de agendamento de notificação */
    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: { seconds: 5 },
    });
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text>Exemplo de sistema de notificação local</Text>
        <Button title="Disparar notificações" onPress={enviarMensagem} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
