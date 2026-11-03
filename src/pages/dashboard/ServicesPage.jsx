import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  PlusCircle,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Check,
  X,
  Layers,
  Power,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';
import { formatCurrency, formatDuration } from '../../utils/formatters';
import { serviceCategories } from '../../data/mockServices';

export function ServicesPage() {
  const { services, addService, updateService, toggleServiceActive, deleteService } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Hair & Styling',
    duration: 60,
    price: 85,
    description: '',
    color: '#6366F1',
  });

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      if (selectedCategory !== 'All' && s.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.name?.toLowerCase().includes(q);
        const matchesDesc = s.description?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    });
  }, [services, selectedCategory, searchQuery]);

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      category: 'Hair & Styling',
      duration: 60,
      price: 85,
      description: '',
      color: '#6366F1',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditService(s);
    setFormData({
      name: s.name,
      category: s.category,
      duration: s.duration,
      price: s.price,
      description: s.description || '',
      color: s.color || '#6366F1',
    });
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (editService) {
      updateService(editService.id, {
        ...formData,
        duration: Number(formData.duration),
        price: Number(formData.price),
      });
      setEditService(null);
    } else {
      addService({
        ...formData,
        duration: Number(formData.duration),
        price: Number(formData.price),
      });
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Service Catalog & Offerings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Configure treatment durations, set prices, assign staff, and toggle online booking visibility.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={PlusCircle}
          onClick={handleOpenAdd}
          className="shadow-glow-brand self-start sm:self-auto"
        >
          Add Service
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by keyword..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      </Card>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No services match your filters"
          description="Try selecting a different category or create a new treatment offering."
          actionLabel="Add Service"
          actionIcon={PlusCircle}
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((s) => (
            <Card
              key={s.id}
              hover
              className={`p-6 flex flex-col justify-between transition-all ${
                !s.active ? 'opacity-60 bg-slate-50/50 dark:bg-slate-900/40' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: s.color || '#6366F1' }}
                    />
                    <Badge variant="default" size="xs">
                      {s.category}
                    </Badge>
                  </div>

                  {s.popular && (
                    <Badge variant="primary" size="xs">
                      Popular
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {s.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                  {s.description}
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDuration(s.duration)}</span>
                  </div>

                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {formatCurrency(s.price)}
                  </p>
                </div>
              </div>

              {/* Bottom Actions & Active Switch */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => toggleServiceActive(s.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    s.active
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  <span>{s.active ? 'Active' : 'Inactive'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(s)}
                    title="Edit service"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(s.id)}
                    title="Delete service"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {(isAddModalOpen || editService) && (
        <Modal
          isOpen={isAddModalOpen || !!editService}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditService(null);
          }}
          title={editService ? 'Edit Service' : 'Add New Service Offering'}
          description="Configure service duration, category, and pricing."
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSaveService} className="space-y-3.5">
            <Input
              label="Service Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Signature Haircut & Style"
              required
            />

            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Hair & Styling">Hair & Styling</option>
              <option value="Skin & Spa">Skin & Spa</option>
              <option value="Fitness & Training">Fitness & Training</option>
              <option value="Consultation">Consultation</option>
            </Select>

            <div className="grid grid-cols-2 gap-3.5">
              <Input
                label="Duration (minutes)"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                icon={Clock}
                min={10}
                max={360}
                required
              />

              <Input
                label="Price (USD)"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                icon={DollarSign}
                min={0}
                required
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                Description & Inclusions
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Include details about the service, wash, treatments included..."
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditService(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {editService ? 'Save Service' : 'Create Service'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Service Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Delete Service Offering?"
          description="Are you sure you want to delete this service from your catalog?"
          maxWidth="max-w-sm"
        >
          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                deleteService(deleteConfirmId);
                setDeleteConfirmId(null);
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

