import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { apiFetch } from '@/constants/api';

interface Message {
  id: string;
  sender: 'doctor' | 'user';
  text: string;
  time: string;
  avatar: any;
}

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'doctor',
      text: 'How can I help you?',
      time: '09:55',
      avatar: require('@/assets/images/doctor.png'),
    },
    {
      id: '2',
      sender: 'user',
      text: 'Thank you for reaching out!\nWe are looking for a surgery.',
      time: '09:55',
      avatar: require('@/assets/images/doctor_avatar.png'),
    },
  ]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    async function loadMessages() {
      try {
        const dbMsgs = await apiFetch<Array<{ id: string; sender: 'user' | 'doctor'; text: string; time: string; avatar?: string }>>('/chat/messages');
        if (dbMsgs && dbMsgs.length > 0) {
          const mapped = dbMsgs.map((m) => ({
            id: m.id,
            sender: m.sender,
            text: m.text,
            time: m.time,
            avatar: m.sender === 'user' 
              ? require('@/assets/images/doctor_avatar.png') 
              : require('@/assets/images/doctor.png'),
          }));
          setMessages(mapped);
        }
      } catch (err) {
        console.log('Error loading messages:', err);
      }
    }
    loadMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const textToSend = inputText;
    setInputText('');

    const tempId = String(messages.length + 1);
    const localMsg: Message = {
      id: tempId,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: require('@/assets/images/doctor_avatar.png'),
    };
    setMessages(prev => [...prev, localMsg]);

    try {
      const res = await apiFetch<{ id: string; sender: 'user' | 'doctor'; text: string; time: string }>('/chat/message', {
        method: 'POST',
        body: JSON.stringify({ sender: 'user', text: textToSend }),
      });
      setMessages(prev => prev.map(m => m.id === tempId ? {
        ...m,
        id: res.id,
      } : m));
    } catch (err) {
      console.log('Error sending message to API:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>←</Text>
          </TouchableOpacity>

          {/* Doctor Info Row */}
          <View style={styles.doctorHeaderCol}>
            <View style={styles.avatarWrapper}>
              <Image source={require('@/assets/images/doctor.png')} style={styles.doctorAvatar} />
              <View style={styles.activeDot} />
            </View>
            <Text style={styles.doctorName}>Dr. David Patel</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.circleButton} activeOpacity={0.8}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Message Area */}
      <ScrollView contentContainerStyle={styles.chatScroll} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => {
          const isDoctor = msg.sender === 'doctor';
          return (
            <View key={msg.id} style={[styles.messageRow, isDoctor ? styles.doctorRow : styles.userRow]}>
              {/* User Avatar on the left for user messages */}
              {!isDoctor && (
                <Image source={msg.avatar} style={styles.bubbleAvatarLeft} />
              )}

              {/* Message Bubble */}
              <View style={[styles.bubble, isDoctor ? styles.doctorBubble : styles.userBubble]}>
                <Text style={[styles.bubbleText, isDoctor ? styles.doctorText : styles.userText]}>
                  {msg.text}
                </Text>
                <Text style={[styles.timeText, isDoctor ? styles.doctorTime : styles.userTime]}>
                  {msg.time}
                </Text>
              </View>

              {/* Doctor Avatar on the right for doctor messages */}
              {isDoctor && (
                <Image source={msg.avatar} style={styles.bubbleAvatarRight} />
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Input controls */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#A39E99"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity
            style={styles.micButton}
            onPress={handleSendMessage}
            activeOpacity={0.85}
          >
            <Text style={styles.micIcon}>🎙️</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#FAF9F6',
    backgroundColor: '#FAF9F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#BD632F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#BD632F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  doctorHeaderCol: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  doctorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FF66',
    borderWidth: 1.5,
    borderColor: '#FAF9F6',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1817',
  },
  chatScroll: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
    maxWidth: '85%',
  },
  doctorRow: {
    alignSelf: 'flex-start',
  },
  userRow: {
    alignSelf: 'flex-end',
  },
  bubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
  },
  doctorBubble: {
    backgroundColor: '#BD632F',
    borderBottomLeftRadius: 4,
    marginRight: 8,
  },
  userBubble: {
    backgroundColor: '#FFF8F4',
    borderBottomRightRadius: 4,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E6E1DC',
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 18,
  },
  doctorText: {
    color: '#FFFFFF',
  },
  userText: {
    color: '#1A1817',
  },
  timeText: {
    fontSize: 10,
    marginTop: 6,
  },
  doctorTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  userTime: {
    color: '#9C9690',
  },
  bubbleAvatarLeft: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  bubbleAvatarRight: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E1DC',
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#1A1817',
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#BD632F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
