import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart3, TrendingUp, Package, TriangleAlert as AlertTriangle, Users, Calendar, Download } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: any;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

export default function ReportsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { key: 'week', label: 'Minggu Ini' },
    { key: 'month', label: 'Bulan Ini' },
    { key: 'quarter', label: 'Kuartal' },
    { key: 'year', label: 'Tahun Ini' },
  ];

  const stats: StatCard[] = [
    {
      title: 'Total Barang',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      color: '#2563EB',
    },
    {
      title: 'Barang Dipinjam',
      value: '23',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: '#EA580C',
    },
    {
      title: 'Barang Rusak',
      value: '8',
      change: '-2%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: '#DC2626',
    },
    {
      title: 'Peminjam Aktif',
      value: '18',
      change: '0%',
      changeType: 'neutral',
      icon: Users,
      color: '#059669',
    },
  ];

  const categoryData: ChartData[] = [
    { label: 'Elektronik', value: 45, color: '#2563EB' },
    { label: 'Furniture', value: 30, color: '#059669' },
    { label: 'Alat Tulis', value: 15, color: '#EA580C' },
    { label: 'Lainnya', value: 10, color: '#7C3AED' },
  ];

  const statusData: ChartData[] = [
    { label: 'Tersedia', value: 68, color: '#059669' },
    { label: 'Dipinjam', value: 20, color: '#EA580C' },
    { label: 'Rusak', value: 8, color: '#DC2626' },
    { label: 'Hilang', value: 4, color: '#7C2D12' },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return '#059669';
      case 'negative': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const renderStatCard = (stat: StatCard) => (
    <View key={stat.title} style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
          <stat.icon size={24} color={stat.color} />
        </View>
        <Text style={[styles.statChange, { color: getChangeColor(stat.changeType) }]}>
          {stat.change}
        </Text>
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statTitle}>{stat.title}</Text>
    </View>
  );

  const renderPieChart = (data: ChartData[], title: string) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
        <View style={styles.pieChartContainer}>
          <View style={styles.pieChart}>
            {data.map((item, index) => (
              <View
                key={item.label}
                style={[
                  styles.pieSlice,
                  {
                    backgroundColor: item.color,
                    height: (item.value / total) * 120,
                  }
                ]}
              />
            ))}
          </View>
          <View style={styles.chartLegend}>
            {data.map((item) => (
              <View key={item.label} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
                <Text style={styles.legendValue}>{item.value}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Laporan & Analisis</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Download size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Period Filter */}
      <View style={styles.periodContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodChip,
                selectedPeriod === period.key && styles.periodChipActive
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[
                styles.periodChipText,
                selectedPeriod === period.key && styles.periodChipTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2563EB']}
          />
        }
      >
        {/* Stats Overview */}
        <View style={styles.statsGrid}>
          {stats.map(renderStatCard)}
        </View>

        {/* Charts */}
        {renderPieChart(categoryData, 'Distribusi Berdasarkan Kategori')}
        {renderPieChart(statusData, 'Status Barang')}

        {/* Recent Activities */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Aktivitas Terbaru</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Package size={16} color="#2563EB" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>5 Laptop Dell ditambahkan ke inventaris</Text>
                <Text style={styles.activityTime}>2 jam yang lalu</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <TrendingUp size={16} color="#EA580C" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Proyektor dipinjam oleh Ahmad Rizki</Text>
                <Text style={styles.activityTime}>5 jam yang lalu</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <AlertTriangle size={16} color="#DC2626" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Laptop mengalami kerusakan layar</Text>
                <Text style={styles.activityTime}>1 hari yang lalu</Text>
              </View>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  downloadButton: {
    backgroundColor: '#F3F4F6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  periodChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  periodChipActive: {
    backgroundColor: '#2563EB',
  },
  periodChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  periodChipTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 8,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  pieChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  pieChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    flexDirection: 'column',
    backgroundColor: '#F3F4F6',
  },
  pieSlice: {
    width: '100%',
  },
  chartLegend: {
    flex: 1,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  legendValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  bottomSpacing: {
    height: 20,
  },
});