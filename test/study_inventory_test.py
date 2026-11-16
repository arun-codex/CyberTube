import io
import sys
import unittest
import zipfile
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from study_inventory import safe_entries, inspect_pdf
from tempfile import TemporaryDirectory

class ArchiveSafety(unittest.TestCase):
    def archive(self, names):
        stream=io.BytesIO()
        with zipfile.ZipFile(stream,'w') as archive:
            for name in names:
                archive.writestr(name,b'content')
        stream.seek(0)
        return zipfile.ZipFile(stream)

    def test_traversal_and_absolute_paths(self):
        for name in ['../bad.pdf','folder/../../bad.pdf','C:/bad.pdf','/bad.pdf','folder\\..\\bad.pdf']:
            with self.subTest(name=name), self.archive([name]) as archive:
                with self.assertRaises(ValueError): safe_entries(archive)

    def test_case_collision(self):
        with self.archive(['nested/A.pdf','nested/a.pdf']) as archive:
            with self.assertRaises(ValueError): safe_entries(archive)

    def test_metadata_and_nested_pdfs(self):
        with self.archive(['nested/a.pdf','__MACOSX/._a.pdf','notes.txt']) as archive:
            self.assertEqual([name for _,name in safe_entries(archive)],['nested/a.pdf'])

    def test_symlink(self):
        stream=io.BytesIO()
        with zipfile.ZipFile(stream,'w') as archive:
            entry=zipfile.ZipInfo('linked.pdf'); entry.external_attr=0o120777 << 16
            archive.writestr(entry,'target')
        stream.seek(0)
        with zipfile.ZipFile(stream) as archive:
            with self.assertRaises(ValueError): safe_entries(archive)

    def test_corrupt_pdf_is_reported(self):
        with TemporaryDirectory() as directory:
            path=Path(directory)/'corrupt.pdf'; path.write_bytes(b'not pdf')
            result=inspect_pdf(path,path.name)
            self.assertFalse(result['opens_correctly'])
            self.assertIsNotNone(result['error'])

if __name__=='__main__': unittest.main()
