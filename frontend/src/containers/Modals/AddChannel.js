import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, FormGroup, FormControl } from 'react-bootstrap';
import { useAddChannelMutation } from '../../store/apis/channelsApi.js';
import { hideModal } from '../../store/slices/ui.js';

const AddChannel = () => {
  const [ addChannel, { isLoading: isAddChannelLoading } ] = useAddChannelMutation();

  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAddChannel = (values) => {
    addChannel({ name: values.name });
  };

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: (values, { resetForm }) => {
      handleAddChannel(values);
      dispatch(hideModal());
      resetForm();
    },
  });

  return (
    <Modal show className="modal">
    <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
      <Modal.Title>Добавить канал</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            className="form__input"
            required
            type="text"
            ref={inputRef}
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            id="channel-name-field"
          />
          <label className="visually-hidden" htmlFor="channel-name-field">
            Имя канала
          </label>
        </div>
        <div className="modal__footer">
          <button
            type="button"
            className="bttn modal__btn"
            onClick={() => dispatch(hideModal())}
          >
            Отменить
          </button>
          <button
            className="bttn modal__btn modal__btn--submit"
            disabled={isAddChannelLoading}
            type="submit"
          >
            Отправить
          </button>
        </div>
        
        
      </form>
    </Modal.Body>
  </Modal>
  );
};

export default AddChannel;

// <input type="submit" className="btn btn-primary mt-2" value="submit" />
/*
return (
  <Modal show>
    <Modal.Header closeButton onHide={hideModal}>
      <Modal.Title>Добавить канал</Modal.Title>
      <button type="button" onClick={() => hideModal()} className="btn-close" aria-label="Close"></button>
    </Modal.Header>

    <Modal.Body>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            required
            type="text"
            ref={inputRef}
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            id="channel-name-field"
          />
          <label className="visually-hidden" htmlFor="channel-name-field">
            Имя канала
          </label>
        </div>
        <div>
          <button>Отменить</button>
          <button
            disabled={isAddChannelLoading}
            type="submit"
          >
            Отправить
          </button>
        </div>
        
        
      </form>
    </Modal.Body>
  </Modal>
);
*/


/*
<Modal show>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              data-testid="input-body"
              name="body"
            />
          </FormGroup>
          <input type="submit" className="btn btn-primary mt-2" value="submit" />
        </form>
      </Modal.Body>
    </Modal>
*/
