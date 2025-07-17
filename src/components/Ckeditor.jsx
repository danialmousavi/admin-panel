import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function RichTextEditor({ value, onChange }) {
   return (
    <div className="input-group mb-3" style={{ direction: "rtl" }}>
      <span className="input-group-text w_6rem justify-content-center">توضیحات</span>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}

export default RichTextEditor