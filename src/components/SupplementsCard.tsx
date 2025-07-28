import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

interface Supplement {
  name: string;
  time: string;
  taken: boolean;
}

interface SupplementsCardProps {
  supplements: Supplement[];
  onToggle: (name: string) => void;
}

const SupplementsCard: React.FC<SupplementsCardProps> = ({ supplements, onToggle }) => {
  const renderItem = ({ item }: { item: Supplement }) => (
    <View style={[styles.item, item.taken ? styles.taken : styles.pending]}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <TouchableOpacity
        onPress={() => onToggle(item.name)}
        style={[styles.button, item.taken ? styles.buttonTaken : styles.buttonPending]}
      >
        {item.taken && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.card, styles.glowRed]}>
      <View style={styles.topBorder} />
      <Text style={styles.title}>💊 Suplementos</Text>
      <FlatList
        data={supplements}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181B',
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EF444430',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  glowRed: {
    borderColor: '#EF4444',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#EF4444',
    opacity: 0.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    color: '#F87171',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    backgroundColor: '#27272A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3F3F46',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taken: {
    backgroundColor: '#134E4A50',
    borderColor: '#22C55E',
  },
  pending: {
    backgroundColor: '#27272A',
    borderColor: '#3F3F46',
  },
  name: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  time: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  button: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTaken: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  buttonPending: {
    borderColor: '#6B7280',
  },
  checkmark: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default SupplementsCard;