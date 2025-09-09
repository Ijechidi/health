"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, List, ListOrdered, Undo2, Redo2, AlignLeft, AlignCenter, AlignRight, AlignJustify, CaseUpper } from "lucide-react";

interface RichEditorProps {
  initialHtml?: string;
  onChange: (json: any, html: string) => void;
}

export default function RichEditor({ initialHtml, onChange }: RichEditorProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialHtml ?? "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON(), editor.getHTML());
    },
  });

  if (!mounted) return null;

  return (
    <div className="border rounded-md">
      {/* Toolbar (icônes) */}
      <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-muted/30">
        <button disabled={!editor} type="button" title="Gras" aria-label="Gras" className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Italique" aria-label="Italique" className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Souligner" aria-label="Souligner" className={`p-2 rounded ${editor?.isActive('underline') ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Barré" aria-label="Barré" className={`p-2 rounded ${editor?.isActive('strike') ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().toggleStrike().run()}>
          <Strikethrough className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button disabled={!editor} type="button" title="Titre 1" aria-label="Titre 1" className={`p-2 rounded ${editor?.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
          <CaseUpper className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Titre 2" aria-label="Titre 2" className={`p-2 rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          <CaseUpper className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Titre 3" aria-label="Titre 3" className={`p-2 rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
          <CaseUpper className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button disabled={!editor} type="button" title="Liste à puces" aria-label="Liste à puces" className={`p-2 rounded ${editor?.isActive('bulletList') ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Liste numérotée" aria-label="Liste numérotée" className={`p-2 rounded ${editor?.isActive('orderedList') ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button disabled={!editor} type="button" title="Aligner à gauche" aria-label="Aligner à gauche" className={`p-2 rounded ${editor?.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
          <AlignLeft className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Centrer" aria-label="Centrer" className={`p-2 rounded ${editor?.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
          <AlignCenter className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Aligner à droite" aria-label="Aligner à droite" className={`p-2 rounded ${editor?.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
          <AlignRight className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Justifier" aria-label="Justifier" className={`p-2 rounded ${editor?.isActive({ textAlign: 'justify' }) ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`} onClick={() => editor?.chain().focus().setTextAlign('justify').run()}>
          <AlignJustify className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button disabled={!editor} type="button" title="Annuler" aria-label="Annuler" className="p-2 rounded hover:bg-blue-50" onClick={() => editor?.chain().focus().undo().run()}>
          <Undo2 className="h-4 w-4" />
        </button>
        <button disabled={!editor} type="button" title="Rétablir" aria-label="Rétablir" className="p-2 rounded hover:bg-blue-50" onClick={() => editor?.chain().focus().redo().run()}>
          <Redo2 className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button disabled={!editor} type="button" title="Effacer" aria-label="Effacer" className="p-2 rounded hover:bg-blue-50" onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}>
          Clear
        </button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none p-3 min-h-[160px]" />
    </div>
  );
}


