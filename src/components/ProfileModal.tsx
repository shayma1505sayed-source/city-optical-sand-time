import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { BrandLogo } from './BrandLogo';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Mail,
  Phone,
  ShieldCheck,
  MapPin,
  Package,
  LogOut,
  Plus,
  Check,
  Edit2,
} from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { user, logout, updateProfile, saveAddress, setDefaultAddress } = useAuth();
  const { isProfileOpen, setIsProfileOpen, setIsOrdersOpen, orders } = useShop();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // New address form
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostal, setNewPostal] = useState('');

  if (!isProfileOpen || !user) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
    });
    setIsEditing(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity) return;
    saveAddress({
      fullName: user.name,
      phone: user.phone,
      streetAddress: newStreet,
      city: newCity,
      state: newState || 'Maharashtra',
      postalCode: newPostal || '400001',
      isDefault: false,
    });
    setNewStreet('');
    setNewCity('');
    setIsAddingAddress(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-700 px-6 py-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white text-sky-700 font-brand font-bold text-lg flex items-center justify-center shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-brand text-lg font-bold text-white leading-tight">
                  {user.name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-sky-100">
                  <span className="font-mono">ID: {user.membershipId}</span>
                  <span>·</span>
                  <span className="text-[#ffd57a] font-semibold">{user.memberTier}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsProfileOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Patron Profile Details */}
            <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Patron Credentials
                </h4>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-sky-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Details'}</span>
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Phone</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sky-600" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Account Security: 2FA Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-sky-600" />
                    <span>{orders.length} Total Orders Placed</span>
                  </div>
                </div>
              )}
            </div>

            {/* Saved Addresses */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Insured Delivery Addresses
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="text-xs text-sky-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Address</span>
                </button>
              </div>

              {isAddingAddress && (
                <form onSubmit={handleAddAddress} className="mb-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    placeholder="Street address &amp; building"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="City"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                    <input
                      type="text"
                      value={newPostal}
                      onChange={(e) => setNewPostal(e.target.value)}
                      placeholder="Postal PIN"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-sky-600 text-white rounded-lg font-semibold"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between text-xs"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-900">{addr.streetAddress}</div>
                        <div className="text-slate-500">
                          {addr.city}, {addr.state} - {addr.postalCode}
                        </div>
                      </div>
                    </div>
                    {addr.isDefault ? (
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                        Default
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[11px] text-slate-500 hover:text-sky-600 font-medium"
                      >
                        Set Default
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  setIsOrdersOpen(true);
                }}
                className="px-4 py-2.5 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                <span>View All Orders &amp; Track Status</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsProfileOpen(false);
                }}
                className="px-4 py-2.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
