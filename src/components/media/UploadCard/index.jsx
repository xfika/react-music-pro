import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from '$components/common/Button';
import Progress from '$components/common/Progress';
import NewItem from '$components/common/NewItem';

import { menus, metamenus } from './menus';
import styles from './index.module.scss';

const dragIcon = require('$assets/images/icons/drag-icon.svg');
const settingsIcon = require('$assets/images/icons/settings.svg');

const initialState = {
  title: '',
  genre: '',
  description: '',
  policy: false,
  recordLabel: '',
  songWriter: '',
  composer: '',
  file: '',
};

const initialStatus = {
  pending: false,
  completed: false,
}

const UploadCard = (props) => {
  // props
  const {
    name,
    index,
    size,
    onRemove,
    onChange,
    values: allFields,
    status,
  } = props;
  const values = allFields[name];

  const lang = useSelector(store => store.user.language);
  const { t, i18n } = useTranslation('common');
  useEffect(() => { i18n.changeLanguage(lang); }, [lang]);

  // state
  const [isOpen, setIsOpen] = useState(false);

  // handlers
  const handleView = () => {
    setIsOpen(!isOpen);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleChange = (itemName, value) => {
    onChange(name, {
      ...initialState,
      ...values,
      [itemName]: value,
    });
  }

  // render
  return (
    <>
      <div className="d-flex">
        <div>
          <img
            className={styles.dragIcon}
            src={dragIcon}
            alt=""
          />
        </div>
        <div className={`d-flex flex-column ${styles.contentWrapper}`}>
          <div>{name} | {size}</div>
          <Progress
            values={status[name] || initialStatus}
            placeholder={t('uploading')}
          />
        </div>
        <div>
          <Button
            onClick={handleView}
            isCustom
            hideDefault
          >
            <img
              className={styles.settingsIcon}
              src={settingsIcon}
              alt=""
            />
          </Button>
        </div>
      </div>
      {
        isOpen && (
          <div className="d-flex flex-column">
            <NewItem
              menus={menus}
              metamenus={metamenus}
              onChange={handleChange}
              values={values || initialState}
            />
            <div className="d-flex">
              <Button
                style={styles.deleteBtn}
                onClick={() => onRemove(index)}
              >
                {t('remove')}
              </Button>
              <Button
                onClick={handleClose}
                style={styles.closeBtn}
                isCustom
                hideDefault
              >
                {t('close')}
              </Button>
            </div>
          </div>
        )
      }

    </>
  );
}

export default UploadCard;
