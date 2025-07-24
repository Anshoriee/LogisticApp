import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Shield, Database, Download, CircleHelp as HelpCircle, LogOut, ChevronRight, Moon, Smartphone } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  type: 'toggle' | 'action' | 'navigation';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  color?: string;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const userInfo = {
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'Administrator',
    avatar: null,
  };

  const settingSections = [
    {
      title: 'Akun',
      items: [
        {
          id: 'profile',
          title: 'Profil Pengguna',
          subtitle: 'Edit informasi pribadi',
          icon: User,
          type: 'navigation',
          onPress: () => Alert.alert('Profil', 'Edit profil akan segera tersedia'),
        },
      ] as SettingItem[],
    },
    {
      title: 'Notifikasi',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Terima notifikasi pengingat',
          icon: Bell,
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications,
        },
      ] as SettingItem[],
    },
    {
      title: 'Keamanan',
      items: [
        {
          id: 'biometric',
          title: 'Autentikasi Biometrik',
          subtitle: 'Gunakan sidik jari atau Face ID',
          icon: Shield,
          type: 'toggle',
          value: biometric,
          onToggle: setBiometric,
        },
      ] as SettingItem[],
    },
    {
      title: 'Aplikasi',
      items: [
        {
          id: 'darkMode',
          title: 'Mode Gelap',
          subtitle: 'Tampilan gelap untuk mata',
          icon: Moon,
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: 'backup',
          title: 'Backup Data',
          subtitle: 'Cadangkan data ke cloud',
          icon: Database,
          type: 'action',
          onPress: () => Alert.alert('Backup', 'Fitur backup akan segera tersedia'),
        },
        {
          id: 'export',
          title: 'Export Data',
          subtitle: 'Download data dalam format Excel',
          icon: Download,
          type: 'action',
          onPress: () => Alert.alert('Export', 'Fitur export akan segera tersedia'),
        },
      ] as SettingItem[],
    },
    {
      title: 'Bantuan',
      items: [
        {
          id: 'help',
          title: 'Bantuan & Dukungan',
          subtitle: 'FAQ dan kontak support',
          icon: HelpCircle,
          type: 'navigation',
          onPress: () => Alert.alert('Bantuan', 'Halaman bantuan akan segera tersedia'),
        },
        {
          id: 'about',
          title: 'Tentang Aplikasi',
          subtitle: 'Versi 1.0.0',
          icon: Smartphone,
          type: 'navigation',
          onPress: () => Alert.alert('Tentang', 'Aplikasi Logistik v1.0.0\nDikembangkan dengan React Native'),
        },
      ] as SettingItem[],
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Keluar',
      'Apakah Anda yakin ingin keluar dari aplikasi?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Keluar', 
          style: 'destructive',
          onPress: () => Alert.alert('Logout', 'Fitur logout akan segera tersedia')
        },
      ]
    );
  };

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={item.type === 'toggle'}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <item.icon size={20} color={item.color || '#6B7280'} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.settingRight}>
        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
            thumbColor={item.value ? '#2563EB' : '#F3F4F6'}
          />
        )}
        {item.type === 'navigation' && (
          <ChevronRight size={20} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSection = (section: { title: string; items: SettingItem[] }) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map(renderSettingItem)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pengaturan</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User size={32} color="#FFFFFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userEmail}>{userInfo.email}</Text>
            <Text style={styles.userRole}>{userInfo.role}</Text>
          </View>
          <TouchableOpacity style={styles.editProfile}>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingSections.map(renderSection)}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Versi 1.0.0</Text>
          <Text style={styles.versionSubtext}>Build 2024.01.25</Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
  editProfile: {
    padding: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingRight: {
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 8,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomSpacing: {
    height: 20,
  },
});