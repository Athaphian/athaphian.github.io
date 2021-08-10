# Using NASM
With this we can execute .asm files.

```shell
nasm -f bin boot2.asm -o boot2.com
hexdump boot2.com
#qemu-system-i386 boot4.com
qemu-system-i386 -drive file=boot2.com,format=raw,index=0,media=disk
```

To get a bootable .asm file:
```
;; A tiny, working bootloader for x86 PCs. Has a few subroutines
;; so it's slightly less useless than just printing "hello world".
;;
;; writeup here: http://joebergeron.io/posts/post_two.html
;;
;; Joe Bergeron, 2016.
;;
;; Bootable medium first 512 bytes should end in 0x55AA
;; When booting first 512 bytes of bootable medium -> 0x007C00
;;  then control is put to that address.
```
