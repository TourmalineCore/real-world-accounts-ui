import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../../../common/api';

function CreateTenant() {
  const history = useNavigate();

  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });

  return (
    <div className="create-tenant" data-cy="create-tenant-page">
      <h1 className="heading create-tenant__title">Add New Tenant</h1>

      <div className="create-tenant__inner">
        <div className="create-tenant__box">
          <span>Name</span>
          <Input
            data-cy="create-tenant-page-input"
            value={formData.name}
            isInvalid={!formData.name && triedToSubmit}
            validationMessages={['This field is required. Please fill it up.']}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value.trim() })}
          />
        </div>
        <div className="create-tenant__inner-button">
          <button
            type="button"
            data-cy="create-tenant-page-button-cancel"
            className="create-account__button"
            onClick={() => history('/tenants')}
          >
            Cancel
          </button>

          <button
            type="button"
            data-cy="create-tenant-page-button-add"
            className="create-account__button"
            onClick={() => createTenantAsync()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );

  async function createTenantAsync() {
    setTriedToSubmit(true);

    if (formData.name) {
      try {
        await api.post<TenantCreate>('/tenants', {
          ...formData,
        });

        setTriedToSubmit(false);
        history('/tenants');

        toast('New tenant added successfully', {
          type: 'success',
          position: 'bottom-center',
          autoClose: 5000,
          pauseOnHover: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export default CreateTenant;
