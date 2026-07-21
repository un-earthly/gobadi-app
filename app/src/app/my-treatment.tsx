import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

interface Treatment {
  id: string;
  name: string;
  type: 'Online' | 'Physical';
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  service: string;
  date: string;
  bookedOn: string;
  status: 'Upcoming' | 'Completed';
  price: string;
  image: any;
}

export default function MyTreatmentScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Online' | 'Physical'>('Online');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const treatments: Treatment[] = [
    {
      id: '1',
      name: 'Dr. David Patel',
      type: 'Online',
      specialty: 'Veterinary Surgery',
      location: 'Oak Street, CA',
      rating: 4.4,
      reviews: 343,
      service: 'Consultancy',
      date: 'Wed, 20 May 2024',
      bookedOn: 'Mon, 18 May 2024',
      status: 'Upcoming',
      price: '120',
      image: require('@/assets/images/doctor.png'),
    },
    {
      id: '2',
      name: 'Sunrise Health Clinic',
      type: 'Physical',
      specialty: 'Veterinary Hospital',
      location: 'San Francisco, CA',
      rating: 4.8,
      reviews: 943,
      service: 'Vaccination',
      date: 'Wed, 20 May 2024',
      bookedOn: 'Mon, 18 May 2024',
      status: 'Completed',
      price: '120',
      image: require('@/assets/images/clinic_lobby.png'),
    },
  ];

  const filteredTreatments = treatments.filter((item) => {
    // Tab filter
    if (item.type !== activeTab) return false;
    
    // Search query filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Status/Filter Chips
    if (activeFilter === 'Upcoming(01)' && item.status !== 'Upcoming') return false;
    if (activeFilter === 'Medicine(03)' && item.specialty !== 'Medicine') return false; // simulated

    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Treatment</Text>

        <TouchableOpacity style={styles.circleButton} activeOpacity={0.8}>
          <Text style={styles.buttonText}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Location selector */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Location</Text>
          <TouchableOpacity style={styles.locationSelector} activeOpacity={0.7}>
            <Text style={styles.locationPin}>📍</Text>
            <Text style={styles.locationText}>Uttar Badda, Dhaka</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Search Field */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Search doctor"
            placeholderTextColor="#A39E99"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Online / Physical Tab Switch */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Online' && styles.tabButtonActive]}
            onPress={() => setActiveTab('Online')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'Online' && styles.tabTextActive]}>
              Online Visit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Physical' && styles.tabButtonActive]}
            onPress={() => setActiveTab('Physical')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'Physical' && styles.tabTextActive]}>
              Physical Visit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Chips row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {['All (12)', 'Upcoming(01)', 'Medicine(03)'].map((filter) => {
            const isSelected = activeFilter === filter || (filter.startsWith('All') && activeFilter === 'All');
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                onPress={() => setActiveFilter(filter.startsWith('All') ? 'All' : filter)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Treatment card List */}
        <View style={styles.listContainer}>
          {filteredTreatments.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.treatmentCard}
              onPress={() => router.push(item.type === 'Online' ? '/video-call' : '/doctor-detail')}
              activeOpacity={0.9}
            >
              {/* Top Card Row */}
              <View style={styles.cardHeader}>
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.doctorName}>{item.name}</Text>
                    <View
                      style={[
                        styles.typeBadge,
                        item.type === 'Online' ? styles.badgeOnline : styles.badgePhysical,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          item.type === 'Online' ? styles.badgeTextOnline : styles.badgeTextPhysical,
                        ]}
                      >
                        {item.type}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.doctorSpecialty}>{item.specialty}</Text>

                  <View style={styles.ratingLocationRow}>
                    <Text style={styles.metaLabel}>📍 {item.location}</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.metaLabel}>⭐ {item.rating} ({item.reviews})</Text>
                  </View>

                  {/* Detail Info Grid */}
                  <View style={styles.detailsGrid}>
                    <View style={styles.detailsCol}>
                      <Text style={styles.gridLabel}>Service</Text>
                      <Text style={styles.gridValue}>{item.service}</Text>
                    </View>
                    <View style={styles.detailsColRight}>
                      <Text style={styles.gridLabelRight}>Date</Text>
                      <Text style={styles.gridValueRight}>{item.date}</Text>
                    </View>
                  </View>

                  <View style={styles.detailsGrid}>
                    <View style={styles.detailsCol}>
                      <Text style={styles.gridLabel}>Booked on</Text>
                      <Text style={styles.gridValue}>{item.bookedOn}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Bottom Card Row */}
              <View style={styles.cardFooter}>
                <View
                  style={[
                    styles.statusIndicatorBadge,
                    item.status === 'Upcoming' ? styles.statusUpcoming : styles.statusCompleted,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusIndicatorText,
                      item.status === 'Upcoming' ? styles.statusTextUpcoming : styles.statusTextCompleted,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.currencySymbol}>৳ </Text>
                  <Text style={styles.priceAmount}>{item.price} </Text>
                  <Text style={styles.paidBadge}>(Paid)</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 20,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#BD632F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1817',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 12,
    color: '#9C9690',
    fontWeight: '500',
    marginBottom: 4,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPin: {
    fontSize: 14,
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1817',
    marginRight: 4,
  },
  dropdownArrow: {
    fontSize: 8,
    color: '#BD632F',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E1DC',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#9C9690',
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#1A1817',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#E6E1DC',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#BD632F',
    marginBottom: -2,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9C9690',
  },
  tabTextActive: {
    color: '#BD632F',
    fontWeight: '700',
  },
  filtersRow: {
    gap: 8,
    paddingBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E1DC',
  },
  filterChipActive: {
    backgroundColor: '#BD632F',
    borderColor: '#BD632F',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7C7672',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    gap: 16,
  },
  treatmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E6E1DC',
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#FAF9F6',
    paddingBottom: 16,
  },
  cardImage: {
    width: 68,
    height: 68,
    borderRadius: 16,
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1817',
  },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeOnline: {
    backgroundColor: '#E8F5E9',
  },
  badgePhysical: {
    backgroundColor: '#F3E5F5',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextOnline: {
    color: '#2E7D32',
  },
  badgeTextPhysical: {
    color: '#7B1FA2',
  },
  doctorSpecialty: {
    fontSize: 12,
    color: '#7C7672',
    marginBottom: 6,
  },
  ratingLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaLabel: {
    fontSize: 11,
    color: '#9C9690',
  },
  metaDot: {
    fontSize: 11,
    color: '#9C9690',
    marginHorizontal: 6,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailsCol: {
    flex: 1.2,
  },
  detailsColRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  gridLabel: {
    fontSize: 11,
    color: '#9C9690',
    marginBottom: 2,
  },
  gridValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1817',
  },
  gridLabelRight: {
    fontSize: 11,
    color: '#9C9690',
    marginBottom: 2,
    textAlign: 'right',
  },
  gridValueRight: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1817',
    textAlign: 'right',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  statusIndicatorBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  statusUpcoming: {
    backgroundColor: '#FFF8F4',
  },
  statusCompleted: {
    backgroundColor: '#E8F5E9',
  },
  statusIndicatorText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextUpcoming: {
    color: '#BD632F',
  },
  statusTextCompleted: {
    color: '#2E7D32',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1817',
  },
  priceAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1817',
  },
  paidBadge: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '600',
  },
});
