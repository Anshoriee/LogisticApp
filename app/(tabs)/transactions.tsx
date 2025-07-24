import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, CircleArrowUp as ArrowUpCircle, CircleArrowDown as ArrowDownCircle, Calendar, User, Package } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

interface Transaction {
  id: string;
  type: 'in' | 'out' | 'return' | 'damage' | 'lost';
  itemName: string;
  itemId: string;
  quantity: number;
  borrowerName?: string;
  borrowerEmail?: string;
  borrowDate?: string;
  returnDate?: string;
  expectedReturnDate?: string;
  notes: string;
  status: 'pending' | 'completed' | 'overdue';
  createdAt: string;
  createdBy: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'out',
    itemName: 'Laptop Dell Inspiron',
    itemId: '1',
    quantity: 1,
    borrowerName: 'Ahmad Rizki',
    borrowerEmail: 'ahmad@company.com',
    borrowDate: '2024-01-20',
    expectedReturnDate: '2024-01-27',
    notes: 'Untuk presentasi klien',
    status: 'pending',
    createdAt: '2024-01-20T10:00:00Z',
    createdBy: 'admin',
  },
  {
    id: '2',
    type: 'return',
    itemName: 'Proyektor Epson',
    itemId: '2',
    quantity: 1,
    borrowerName: 'Siti Nurhaliza',
    borrowerEmail: 'siti@company.com',
    borrowDate: '2024-01-15',
    returnDate: '2024-01-19',
    expectedReturnDate: '2024-01-20',
    notes: 'Dikembalikan dalam kondisi baik',
    status: 'completed',
    createdAt: '2024-01-19T14:30:00Z',
    createdBy: 'staff',
  },
  {
    id: '3',
    type: 'in',
    itemName: 'Meja Kantor',
    itemId: '3',
    quantity: 5,
    notes: 'Barang baru dari supplier',
    status: 'completed',
    createdAt: '2024-01-18T09:15:00Z',
    createdBy: 'admin',
  },
  {
    id: '4',
    type: 'damage',
    itemName: 'Laptop Dell Inspiron',
    itemId: '1',
    quantity: 1,
    borrowerName: 'Budi Santoso',
    notes: 'Layar pecah, perlu perbaikan',
    status: 'completed',
    createdAt: '2024-01-17T16:45:00Z',
    createdBy: 'staff',
  },
];

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = ['all', 'in', 'out', 'return', 'damage', 'lost'];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    return transaction.type === selectedFilter;
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'in': return <ArrowDownCircle size={20} color="#059669" />;
      case 'out': return <ArrowUpCircle size={20} color="#EA580C" />;
      case 'return': return <ArrowDownCircle size={20} color="#2563EB" />;
      case 'damage': return <Package size={20} color="#DC2626" />;
      case 'lost': return <Package size={20} color="#7C2D12" />;
      default: return <Package size={20} color="#6B7280" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'in': return '#059669';
      case 'out': return '#EA580C';
      case 'return': return '#2563EB';
      case 'damage': return '#DC2626';
      case 'lost': return '#7C2D12';
      default: return '#6B7280';
    }
  };

  const getTransactionTitle = (type: string) => {
    switch (type) {
      case 'in': return 'Barang Masuk';
      case 'out': return 'Barang Keluar';
      case 'return': return 'Pengembalian';
      case 'damage': return 'Barang Rusak';
      case 'lost': return 'Barang Hilang';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#059669';
      case 'pending': return '#EA580C';
      case 'overdue': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'pending': return 'Menunggu';
      case 'overdue': return 'Terlambat';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddTransaction = () => {
    Alert.alert('Tambah Transaksi', 'Fitur tambah transaksi akan segera tersedia');
  };

  const handleTransactionDetail = (transaction: Transaction) => {
    Alert.alert('Detail Transaksi', `ID: ${transaction.id}\nBarang: ${transaction.itemName}`);
  };

  const renderTransaction = (transaction: Transaction) => (
    <TouchableOpacity
      key={transaction.id}
      style={styles.transactionCard}
      onPress={() => handleTransactionDetail(transaction)}
    >
      <View style={styles.transactionHeader}>
        <View style={styles.transactionTypeContainer}>
          {getTransactionIcon(transaction.type)}
          <Text style={[styles.transactionType, { color: getTransactionColor(transaction.type) }]}>
            {getTransactionTitle(transaction.type)}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(transaction.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
            {getStatusText(transaction.status)}
          </Text>
        </View>
      </View>

      <Text style={styles.itemName}>{transaction.itemName}</Text>
      <Text style={styles.quantity}>Jumlah: {transaction.quantity} unit</Text>

      {transaction.borrowerName && (
        <View style={styles.borrowerInfo}>
          <User size={16} color="#6B7280" />
          <Text style={styles.borrowerText}>{transaction.borrowerName}</Text>
        </View>
      )}

      {transaction.borrowDate && (
        <View style={styles.dateInfo}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.dateText}>
            Dipinjam: {new Date(transaction.borrowDate).toLocaleDateString('id-ID')}
          </Text>
        </View>
      )}

      {transaction.expectedReturnDate && transaction.status === 'pending' && (
        <View style={styles.dateInfo}>
          <Calendar size={16} color="#EA580C" />
          <Text style={styles.dateText}>
            Target kembali: {new Date(transaction.expectedReturnDate).toLocaleDateString('id-ID')}
          </Text>
        </View>
      )}

      {transaction.returnDate && (
        <View style={styles.dateInfo}>
          <Calendar size={16} color="#059669" />
          <Text style={styles.dateText}>
            Dikembalikan: {new Date(transaction.returnDate).toLocaleDateString('id-ID')}
          </Text>
        </View>
      )}

      <Text style={styles.notes}>{transaction.notes}</Text>
      
      <View style={styles.transactionFooter}>
        <Text style={styles.createdBy}>Oleh: {transaction.createdBy}</Text>
        <Text style={styles.createdAt}>{formatDate(transaction.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaksi</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilter === filter && styles.filterChipTextActive
              ]}>
                {filter === 'all' ? 'Semua' : getTransactionTitle(filter)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Transactions List */}
      <ScrollView
        style={styles.transactionsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2563EB']}
          />
        }
      >
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(renderTransaction)
        ) : (
          <View style={styles.emptyState}>
            <Package size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateText}>Tidak ada transaksi</Text>
            <Text style={styles.emptyStateSubtext}>
              Transaksi akan muncul di sini
            </Text>
          </View>
        )}
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
  addButton: {
    backgroundColor: '#2563EB',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
  },
  filterChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  borrowerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  borrowerText: {
    fontSize: 14,
    color: '#374151',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#374151',
  },
  notes: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    fontStyle: 'italic',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  createdBy: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  createdAt: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
});